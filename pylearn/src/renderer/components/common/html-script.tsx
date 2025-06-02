import React from 'react'
import parse from 'html-react-parser';
import { CodeBlock, dracula } from 'react-code-blocks';

const HtmlScript = (props: {type: string, value: string}) => {
  const {type, value} = props;
  return (
    <div className={"my-4 [&_a]:text-blue-500"}>{
      type == "block_code" ?
        <CodeBlock
          text={value}
          language={"python"}
          showLineNumbers={true}
          theme={dracula}
        /> : parse(value)
    }</div>
  )
}
export default HtmlScript
