import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';



//onClick={handleClick}
function Breadcrumbs() {

    const handleClick = () => {
        console.log('Breadcrumb item clicked!');
      };
  return (
    <div>
      <Breadcrumb tag="nav" listTag="div">
        <BreadcrumbItem tag="a" href="#">User Form</BreadcrumbItem>
        <BreadcrumbItem tag="a" href="#">Select Pokemon</BreadcrumbItem>
        <BreadcrumbItem tag="a" href="#">Review</BreadcrumbItem>
        <BreadcrumbItem active="false" tag="span">Submitted</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;