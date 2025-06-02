import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "renderer/components/ui/breadcrumb";
import {Link} from "react-router-dom";

const HeroBreadcrumb = (props: { path: { link: string, name: string, state?: any}[] , page: string}) => {
  const {path, page} = props;
  return <Breadcrumb>
    <BreadcrumbList>
      {path.map((item, index) => {
        return (
          <>
            <BreadcrumbItem>
              <Link to={item.link} state={item.state ?? {}}>{item.name.toWellFormed()}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
          </>
        )
      })}
      <BreadcrumbItem>
        <BreadcrumbPage>{page}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>;
}
export default HeroBreadcrumb
