import CardBody from "./CardBody";
import CardHead from "./CardHead";
import "./PersonCard.scss";
// import { AddUser } from "../../../../../Images/Investor/CompanyProfile";
// import { AddUserIcon } from "../../../SvgIcons";

export default function PersonCard({ person, isFeedBack }) {
  let personHead = [];

  if (isFeedBack) {
    personHead = {
      image: person.image,
      name: person.name,
      rating: person.rating,
      designation: person.designation,
    };
  } else {
    personHead = {
      image: person.image,
      name: person.name,
      age: person.age,
      designation: person.designation,
    };
  }

  return (
    <div className="personCard__container d-flex flex-column gap-2 px-4 pt-4 rounded-4 border" style={{height:"6rem"}}>
      <CardHead {...personHead} person={person} />
      {/*<CardBody>{isFeedBack && <p className="">{person.feedback}</p>}</CardBody>*/}
    </div>
  );
}

{
  /*}: (
          <>

            {/* <button className="btn-capital-small connectNow d-flex align-items-center gap-1 ms-auto">
              <AddUserIcon />
              <p>Connect Now</p>
            </button> 
            </>*/
}
