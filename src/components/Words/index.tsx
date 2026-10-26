import { Fragment } from "react";

// Each word sits in its own mask so a heading can rise line by line; Motion numbers the lines once the words have wrapped.
export default function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="word">
        <span className="word-in">{word}</span>
      </span>
      {i < words.length - 1 && " "}
    </Fragment>
  ));
}
