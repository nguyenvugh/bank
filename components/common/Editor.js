import React from "react"
import dynamic from "next/dynamic"
import "suneditor/dist/css/suneditor.min.css" // Import Sun Editor's CSS File

function Editor({ onChange, onClick, defaultValue, ...rest }) {
  const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  })
  return (
    <div>
      <SunEditor
        onChange={onChange}
        onClick={onClick}
        setOptions={{
          height: 200,
          buttonList: [
            ["undo", "redo", "font", "fontSize", "formatBlock"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
              "removeFormat",
            ],
            [
              // Line break
              ("fontColor",
              "hiliteColor",
              "outdent",
              "indent",
              "align",
              "horizontalRule",
              "list",
              "table"),
            ],
            [
              "link",
              "image",
              "fullScreen",
              "showBlocks",
              "codeView",
              "preview",
              "save",
            ],
          ], // Or Array of button list, eg. [['font', 'align'], ['image']]
          // Other option
        }}
        defaultValue={defaultValue}
        {...rest}
      />
    </div>
  )
}

export default Editor
