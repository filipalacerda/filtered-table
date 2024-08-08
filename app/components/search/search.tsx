import type { Operator, Property, Filters } from "../../types";

type SearchProps = {
  categories: Property[];
  operators: Operator[];
  onSubmit: ({ property, operator, value }: Filters) => void;
  onClear: () => void;
};

const Search = ({
  categories,
  operators,
  onClear,
  onSubmit,
}: SearchProps) => {};

export default Search;
