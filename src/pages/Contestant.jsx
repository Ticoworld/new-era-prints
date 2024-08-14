import React from "react";
import Header from "../components/Header";
import EachContestant from "../components/EachContestant";
import ContestLeaderBoard from "../components/contestLeaderBoard";

const Contestant = () => {
  return (<div>
    <Header />
    <EachContestant />
    <ContestLeaderBoard />
  </div>);
};

export default Contestant;
