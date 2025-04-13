import { Text, Image } from "@chakra-ui/react";
import {useDb} from "../providers/DatabaseProvider.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function DoodlePage() {
  const [doodle, setDoodle] = useState(null);
  const db = useDb();
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    if (!id) {
      return navigate("/doodles");
    }
    db.getDoodle(id).then((doodle) => {
      if (!doodle) {
        return navigate("/doodles");
      }
      setDoodle(doodle);
    })
  })

  if (!doodle) {
    return null
  }
  return (
      <Image w = {500} h = {500} src = {doodle.data} className= "border" />
  );
}

export default DoodlePage;
