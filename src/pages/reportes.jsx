import React from "react";
import { Container, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody} from "reactstrap";

function Reportes(){
    return(
        <div className="noc">
        <Container>
        <UncontrolledAccordion defaultOpen="1">
  <AccordionItem>
    <AccordionHeader targetId="1">
      Accordion Item 1
    </AccordionHeader>
    <AccordionBody accordionId="1">
      <strong>
        This is the first item's accordion body.
      </strong>
      You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
      <code>
        .accordion-body
      </code>
      , though the transition does limit overflow.
    </AccordionBody>
  </AccordionItem>
  <AccordionItem>
    <AccordionHeader targetId="2">
      Accordion Item 2
    </AccordionHeader>
    <AccordionBody accordionId="2">
      <strong>
        This is the second item's accordion body.
      </strong>
      You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
      <code>
        .accordion-body
      </code>
      , though the transition does limit overflow.
    </AccordionBody>
  </AccordionItem>
  <AccordionItem>
    <AccordionHeader targetId="3">
      Accordion Item 3
    </AccordionHeader>
    <AccordionBody accordionId="3">
      <strong>
        This is the third item's accordion body.
      </strong>
      You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
      <code>
        .accordion-body
      </code>
      , though the transition does limit overflow.
    </AccordionBody>
  </AccordionItem>
</UncontrolledAccordion>
        </Container>
        </div>
    );
};

export default Reportes;