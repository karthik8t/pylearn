import React, {useEffect, useState} from 'react'
import {ConceptSchema} from "shared/types";

const Concepts = () => {
  const [concepts, setConcepts] = useState<ConceptSchema[]>([])

  useEffect(() => {
  }, []);

  return (
    <div>Concepts</div>
  )
}
export default Concepts
