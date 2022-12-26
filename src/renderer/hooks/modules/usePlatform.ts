import { useState } from "react"
import { getPlatform } from "renderer/utils"

export const usePlatform = () => {
  const [platform] = useState(getPlatform())
  return {
    platform,
    isWindows: platform === "win32",
    isMac: platform === "darwin",
    isLinux: platform === "linux",
    isFreeBSD: platform === "freebsd",
    isSunOS: platform === "sunos",
    isAIX: platform === "aix",
    isOpenBSD: platform === "openbsd",
  }
}
