"use strict";

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hey Tushar Look Your Face , why are you looking tense all time, Don't Worry I will Manage Your Server!",
        input: event,
      },
      null,
      2
    ),
  };
};
