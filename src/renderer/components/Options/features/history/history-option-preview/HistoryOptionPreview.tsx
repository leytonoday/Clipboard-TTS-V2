import Mascot             from "renderer/components/common/Mascot";
import { useStore }       from 'renderer/store';
import HistoryItemDisplay from "../common/HistoryItemDisplay";

const HistoryOptionPreview = () => {
  const store = useStore();
  const historyItem = store.history.length ? store.history[0] : null

  return (
    <>
      {
        historyItem ? (
          <HistoryItemDisplay historyItem={historyItem} previewMode />
        ) : (
          <Mascot label="No history" />
        )
      }
    </>
  )
}

export default HistoryOptionPreview;
