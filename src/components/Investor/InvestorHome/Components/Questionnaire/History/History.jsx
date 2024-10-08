import React from "react";

export default function History({ history }) {
  return (
    <>
      {history?.length > 0 &&
        history?.map((data, index) => {
          return (
            <div className="d-flex flex-column gap-3" key={data.questionId}>
              <div className="chat_box">
                <p className="m-0">{data.question}</p>
              </div>
              <div className="answer_box">
                {!Array.isArray(data.answer) && (
                  <p className="m-0">{data.answer}</p>
                )}
                {Array.isArray(data.answer) &&
                  data.answer.map((text) => (
                    <p className="m-0" key={text}>
                      {text}
                    </p>
                  ))}
              </div>
            </div>
          );
        })}
    </>
  );
}
