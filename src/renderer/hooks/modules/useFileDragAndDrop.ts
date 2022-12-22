import {
  isApiKeySet,
  electronLoadFile,
  textToSpeechEnqueue
} from "renderer/utils"
import { useStore }           from "renderer/store"
import { useToast }           from "@chakra-ui/react"
import { ClipboardData }      from "renderer/types"
import { useEffect, useRef }  from "react"

export const useFileDragAndDrop = () => {
  const toast = useToast()
  const store = useStore()
  const dragCounter = useRef(0)

  useEffect(() => {
    document.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });

    document.addEventListener('dragenter', (_) => {
      if (dragCounter.current === 0)
        store.setDragAndDropModalOpen(true)
      dragCounter.current++
    });

    document.addEventListener('dragleave', (_) => {
      dragCounter.current--
      if (dragCounter.current === 0)
        store.setDragAndDropModalOpen(false)
    });

    document.addEventListener('drop', (event) => {
      event.preventDefault();
      event.stopPropagation();
      store.setDragAndDropModalOpen(false)
      dragCounter.current = 0

      if (!isApiKeySet()) {
        toast({
          title: "API key not set",
          description: "Please set your API key in the settings page",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        return
      }

      const files = event.dataTransfer?.files

      if (!files || !files.length)
        return

      // Load each file
      for(let i = 0; i < files.length; i++) {
        const file = electronLoadFile(files.item(i)!.path)

        console.log(file)

        if (file.error) {
          toast({
            title: "Error",
            description: file.error,
            status: "error",
            duration: 5000,
            isClosable: true,
          })
          continue;
        }

        if (file.file && file.file.length === 0) {
          toast({
            title: "Error",
            description: "File empty",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
          continue;
        }

        let clipboardData: ClipboardData | null = null

        if (file.mimeType!.includes("text/")) {
          // Uint8Array to string
          const text = new TextDecoder().decode(file.file)
          clipboardData = {
            data: text,
            mimeType: file.mimeType!,
          }
        }
        else if (file.mimeType!.includes("image/")) {
          // Uint8Array to base64
          const base64 = btoa(Array.from(new Uint8Array(file.file!)).map(b => String.fromCharCode(b)).join(''))
          clipboardData = {
            data: `data:${file.mimeType};base64,${base64}`,
            mimeType: file.mimeType!,
          }
        }

        if (clipboardData) {
          const success = textToSpeechEnqueue(clipboardData)
          if (!success) {
            toast({
              title: "Error",
              description: `Queue limit of ${store.textToSpeechQueueSize} reached`,
              status: "error",
              duration: 5000,
              isClosable: true,
            })
          }
          else {
            const fileName = files.item(i)!.path.split("\\").pop()
            toast({
              title: "Success",
              description: `Added '${fileName}' to queue`,
              status: "success",
              duration: 5000,
              isClosable: true,
            })
          }
        }
      }
    });

  }, [])
}
