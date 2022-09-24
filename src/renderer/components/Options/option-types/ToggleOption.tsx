import OptionIcon               from "../common/OptionIcon";
import { useStore }             from "renderer/store";
import SimpleTooltip            from "renderer/components/common/SimpleTooltip"
import { IToggleOption }        from "renderer/types";
import { useState, useEffect }  from "react";

const ToggleOption = (props: IToggleOption) => {
  const store = useStore()

  const currentlyActiveOptions = store.currentlyActiveOptions;

  const disabled = props.disabled ? props.disabled() : false;

  const [isActive, setIsActive] = useState(currentlyActiveOptions.includes(props.name) as boolean);

  const onClick = () => {
    store.toggleCurrentlyActiveEnabledState(props.name);
    setIsActive(!isActive)
  }

  useEffect(() => {
    setIsActive(currentlyActiveOptions.includes(props.name))
  }, [currentlyActiveOptions])

  return (
    <SimpleTooltip label={props.name}>
      <span>
        <OptionIcon icon={props.icon} active={isActive} onClick={onClick} disabled={disabled}/>
      </span>
    </SimpleTooltip>
  );
}

export default ToggleOption;
