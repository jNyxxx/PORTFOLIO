"use client";
import { useClock } from "@/hooks/use-browser";
export function Footer() {
  const { year } = useClock();
  return (
    <footer>
      <a className={"wordmark"} href={"#"}>
        {"nyx"}
        <span>{"✳"}</span>
      </a>
      <span>
        {"© "}
        <span id={"year"}>{year}</span>
        {" JUNEX GLENN BARAN"}
      </span>
      <a href={"#"}>{"BACK TO TOP ↑"}</a>
    </footer>
  );
}
