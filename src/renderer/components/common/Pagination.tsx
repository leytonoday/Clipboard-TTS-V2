import {
  Box,
  Button,
} from '@chakra-ui/react';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePagination } from 'renderer/hooks';

interface PaginationProps {
  setCurrentPage: (input: number) => void,
  currentPage: number,
  totalPages: number,
  pageSize: number
}

const Pagination = (props: PaginationProps) => {

  const paginationRange = usePagination({ currentPage: props.currentPage + 1, totalPages: props.totalPages, siblingCount: 1, pageSize: props.pageSize });

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <Button mr="0.5em" onClick={() => props.setCurrentPage(0)}>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </Button>
      <Button mr="0.5em" onClick={() => props.setCurrentPage(Math.max(props.currentPage-1, 0)) }>
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>
      {
        paginationRange!.map((i, index) => (
          <Button
            key={index}
            mr="0.5em"
            variant={i === props.currentPage + 1 ? "solid" : "ghost"}
            onClick={() => i !== "..." ? props.setCurrentPage(i as number - 1) : undefined}
            colorScheme={i === props.currentPage + 1 ? "primary" : undefined}
            pointerEvents={i === "..." ? "none" : "auto"}
          >
            {i}
          </Button>
        ))
      }
      <Button mr="0.5em" onClick={() => props.setCurrentPage(Math.min(props.currentPage+1, props.totalPages-1)) }>
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
      <Button onClick={() => props.setCurrentPage(props.totalPages-1)}>
        <FontAwesomeIcon icon={faAnglesRight}/>
      </Button>
    </Box>
  )
}

export default Pagination
