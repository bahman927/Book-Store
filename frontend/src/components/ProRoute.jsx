import { userCheck } from "../utils/userCheck";
import ErrorMessage from "./ErrorMessage";
export default function ProRoute({ children }) {
  const { valid, error } = userCheck();
  if (!valid) return <ErrorMessage message={error} redirectTo="/" />;
  return children;
}