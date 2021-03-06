import React from "react";
import { useModule } from "react-hook-module";

export default (props) => {
  const { module } = useModule(props, {
    actions: {
      callback: (msg) => module.updateState({ msg })
    }
  });
  return (
    <div style={{ border: "1px dashed", padding: "1em" }}>
      <h2>useModule demo {">"} modules interaction</h2>
      <div>
        <strong>
          {"<"}Module1{">"}
        </strong>
      </div>{" "}
      <p />
      <button
        onClick={(e) =>
          module.updateStateFor("alias_in_parent", {
            value: "Value updated by updateState"
          })
        }
      >
        updateState for Module2
      </button>
      {" | "}
      <button
        onClick={(e) =>
          module.sendMessageTo(
            "alias_in_parent",
            "Value updated by sendMessage"
          )
        }
      >
        sendMessage to Module2
      </button>
      {" | "}
      <button
        onClick={(e) =>
          useModule.dispatchActionTo("global_uid", "updValue", [
            "Value updated by dispatchAction"
          ])
        }
      >
        dispatchAction to Module2
      </button>
      <p />
      <div> Callback Message: "{module.state.msg || "No callback yet"}"</div>
      <p />
      <Module2 usemodule_alias="alias_in_parent" usemodule_parent={module} />
      <Module2 usemodule_uid="global_uid" />
    </div>
  );
};

export const Module2 = (props) => {
  const { module } = useModule(props, {
    props: {
      onMessage: (value) => {
        module.updateState({ value });
        module.parent.dispatchAction("callback", ["Message received"]);
      }
    },
    actions: {
      updValue: (value) => {
        module.updateState({ value });
      }
    }
  });
  return (
    <div style={{ border: "1px dashed", padding: "1em" }}>
      <div>
        <strong>
          {"<"}Module2{">"}
        </strong>{" "}
        ( {props.usemodule_alias ? "alias='" + props.usemodule_alias + "'" : ""}{" "}
        {props.usemodule_uid ? "uid='" + props.usemodule_uid + "'" : ""} )
      </div>{" "}
      <p />
      value = "<strong>{module.state.value}</strong>"
    </div>
  );
};
