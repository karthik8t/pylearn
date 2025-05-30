import React from 'react'
import {Button} from "renderer/components/ui/button";

const Tags = (props: {tags : string[]}) => {
  const {tags} = props;
  return (
    <div className={"flex flex-row gap-4 flex-wrap"}>
      {tags.map(tag => (
        <Button key={tag} variant={"secondary"}>
          {tag}
        </Button>
      ))}
    </div>
  )
}
export default Tags
