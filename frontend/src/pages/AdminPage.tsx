import RuleRow from "../components/RuleRow";

const AdminPage = () => {
  return (
    <>
      <RuleRow
        order={1}
        ruleName="Sample Rule"
        status="active"
        numberOfConditions={3}
        outcome="Sample Outcome"
      />
    </>
  );
};

export default AdminPage;
