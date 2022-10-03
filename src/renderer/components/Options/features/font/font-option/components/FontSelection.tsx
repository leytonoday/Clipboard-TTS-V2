import {
  Box,
  Center,
  HStack,
  Button,
  useToast,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import SearchBar                      from "renderer/components/common/SearchBar"
import Pagination                     from 'renderer/components/common/Pagination';
import BlockButton                    from "renderer/components/common/BlockButton";
import SimpleSelect                   from "renderer/components/common/SimpleSelect"
import { useStore }                   from 'renderer/store';
import NoResultsMascot                from "renderer/components/common/NoResultsMascot"
import OptionSubHeader                from "renderer/components/options/common/OptionSubHeader"
import { paginateArray }              from 'renderer/utils';
import { availableFonts }             from 'renderer/misc/data';
import React, { useState, useEffect } from 'react';

const searchFonts = (fonts: string[], searchQuery: string) => {
  if (!searchQuery) return fonts;

  return fonts.filter((i) =>
    i.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

const getDisplayFonts = (fonts: string[], pageSize: number, currentPage: number, searchQuery: string) => {
  const searchedFonts = searchFonts(fonts, searchQuery);
  const paginatedFonts = paginateArray(searchedFonts, currentPage, pageSize);

  return paginatedFonts;
};

const FontSelection = () => {
  // Hooks
  const store = useStore();
  const toast = useToast();

  // State
  const [pageSize, setPageSize]         = useState(store.fontSelectionPageSize);
  const [totalPages, setTotalPages]     = useState(Math.ceil(availableFonts.length / pageSize));
  const [searchQuery, setSearchQuery]   = useState('');
  const [currentPage, setCurrentPage]   = useState(Math.floor( availableFonts.findIndex((i) => i === store.font) / pageSize));
  const [displayFonts, setDisplayFonts] = useState(getDisplayFonts(availableFonts, pageSize, currentPage, searchQuery)); // The fonts displayed after search and pagination have occured

  // Effects
  useEffect(() => {
    setDisplayFonts(getDisplayFonts(availableFonts, pageSize, currentPage, searchQuery));
  }, [searchQuery, pageSize, currentPage]);

  // Misc
  const columnCount   = useBreakpointValue({ md: 2, lg: 3 }) as number;

  // Handlers
  const goToCurrentFont = () => {
    setSearchQuery('');
    const index = availableFonts.findIndex((i) => i === store.font);
    const page = Math.floor(index / pageSize);
    setCurrentPage(page);
    setTotalPages(Math.ceil(availableFonts.length / pageSize));
  };

  const onChangePageSize = (newPageSize: any) => {
    if (newPageSize === pageSize)
      return;

    newPageSize = parseInt(newPageSize.value)

    store.setFontSelectionPageSize(newPageSize);

    const oldPosition = Math.round(((currentPage + 1) / totalPages) * 10) / 10;
    const newTotalPages = Math.ceil(searchFonts(availableFonts, searchQuery).length / newPageSize);

    setPageSize(newPageSize);
    setCurrentPage(Math.min(Math.floor(oldPosition * newTotalPages), newTotalPages - 1));

    setTotalPages(newTotalPages);
    setDisplayFonts(getDisplayFonts(availableFonts, newPageSize, 0, searchQuery));
  };

  const onSearch = (searchQuery: string) => {
    setCurrentPage(0);
    setSearchQuery(searchQuery);
    setTotalPages( Math.ceil(searchFonts(availableFonts, searchQuery).length / pageSize));
  }

  return (
    <>
      <OptionSubHeader includePadding title="Font" info="Changes the font of the output box" />

      {/* Search */}
      <Box padding="0 1em" marginTop="1em">
        <SearchBar searchQuery={searchQuery} handleSearch={onSearch} />
      </Box>

      {/* Buttons and Page Size Select */}
      <HStack padding="0.75em 1em 0.5em 1em" width="100%" justifyContent="flex-end">
        <Button onClick={() => {
          store.resetFont()
          toast({
            title: "Font Reset",
            description: "The font has been reset to the default",
            duration: 5000,
            isClosable: true,
          })
        }} size="sm">Reset</Button>
        <Button onClick={goToCurrentFont} size="sm">Go to current font</Button>


        <SimpleSelect width="6em" value={store.fontSelectionPageSize} onChange={onChangePageSize} size="sm" options={
          Array.from({length: 6}).map((_, index) => {
            return {
              label: ((index + 1) * 6).toString(),
              value: (index + 1) * 6
            }
          })}
        />

      </HStack>

      {/* Pagination */}
      {
        displayFonts.length ? (
          <Box margin="1em 0 1.5em 0">
            <Pagination currentPage={currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage} totalPages={totalPages} />
          </Box>
        ) : null
      }

      {/* Fonts */}
      <Center>
        {
          displayFonts.length ? (
            <SimpleGrid columns={columnCount} spacing="1.25em 1em">
              {displayFonts.map((i: string) => (
                <Box key={i}>
                  <BlockButton width="9em" height="6em" onClick={() => store.setFont(i)} font={i} label={i} selected={store.font === i} />
                </Box>
              ))}
            </SimpleGrid>
          ) : null
        }

        {
          !displayFonts.length ? (
            <NoResultsMascot />
          ) : null
        }
      </Center>
    </>
  );
};

export default React.memo(FontSelection);
