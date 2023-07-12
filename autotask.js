  exports.handler = async function (payload) {
  const conditionRequest = payload.request.body;
  const matches = [];
  const events = conditionRequest.events;
  for (const evt of events) {
    // add custom logic for matching here
    let signature = evt.matchReasons[0].signature;
    let isDepositToOtherChain = signature.includes("DepositToOtherChain");
    let isLPDeposit = signature.includes("LPDeposit");
    let isLPWithdrawal = signature.includes("LPWithdrawal");
    let isNewCommitment = signature.includes("NewCommitment");
    let isNewNullifier = signature.includes("NewNullifier");
    let isOracleDeposit = signature.includes("OracleDeposit");
    let isSwap = signature.includes("Swap");
    
    let label;
    if (isDepositToOtherChain === true) {
      label = "DepositToOtherChain";
    } else if (isLPDeposit === true) {
      label = "LPDeposit";
    } else if (isLPWithdrawal === true) {
      label = "LPWithdrawal";
    } else if (isNewCommitment === true) {
      label = "NewCommitment";
    } else if (isNewNullifier === true) {
      label = "NewNullifier";
    } else if (isOracleDeposit === true) {
      label = "OracleDeposit";
    } else if (isSwap === true) {
      label = "Swap";
    } 

    // metadata can be any JSON-marshalable object (or undefined)
    matches.push({
      hash: evt.hash,
      metadata: {
        reasons: evt.matchReasons[0].signature,
        label: label,
      },
    });
  }
  return { matches };
};
