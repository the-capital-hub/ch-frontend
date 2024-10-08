import PersonCard from "../../shared-components/person-card/PersonCard";
import {
  userOne,
  userTwo,
  userThree,
  userFour,
} from "../../../../../Images/Investor/CompanyProfile";
import "./Feedback.scss";

export default function Feedback() {
  let people = [];
  // Make fetch request and store data in people array.
  // ...
  // Mocking people data
  people = [
    {
      id: 1,
      image: userOne,
      name: "Tom Holder",
      rating: 4,
      feedback:
        "This is my first review and also every website and app working very good and there is not lag on website or app.",
    },
    {
      id: 2,
      image: userTwo,
      name: "Karthik",
      rating: 5,
      feedback:
        "This is my first review and also every website and app working very good and there is not lag on website or app.",
    },
    {
      id: 3,
      image: userThree,
      name: "Jonas",
      rating: 5,
      feedback:
        "This is my first review and also every website and app working very good and there is not lag on website or app.",
    },
    {
      id: 4,
      image: userFour,
      name: "Harideep",
      rating: 5,
      feedback:
        "This is my first review and also every website and app working very good and there is not lag on website or app.",
    },
    {
      id: 5,
      image: userThree,
      name: "Jonas",
      rating: 5,
      feedback:
        "This is my first review and also every website and app working very good and there is not lag on website or app.",
    },
  ];

  return (
    <div className="feedback d-flex flex-column gap-4">
      <h6 className="div__heading">Feedback</h6>
      <div className="cards__container d-flex gap-5 pb-2">
        {people.map((person) => {
          return (
            <PersonCard key={person.id} person={person} isFeedBack={true} />
          );
        })}
      </div>
    </div>
  );
}
