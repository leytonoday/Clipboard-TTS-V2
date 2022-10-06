import OptionIcon         from "../common/OptionIcon";
import SimpleTooltip      from "renderer/components/common/SimpleTooltip"
import { ICommandOption } from "renderer/types";

const CommandOption = (props: ICommandOption) => {
  const disabled = props.disabled ? props.disabled() : false;

  return (
    <SimpleTooltip label={props.name}>
      <span>
        <OptionIcon icon={props.icon()} active={false} onClick={props.command} disabled={disabled}/>
      </span>
    </SimpleTooltip>
  );
}

export default CommandOption;
