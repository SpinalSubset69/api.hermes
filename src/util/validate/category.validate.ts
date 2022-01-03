import { InvalidPropertyError } from "../../common/exceptions/errors";
import { RequiredParam } from "../../common/exceptions/required.param";
import { CategoryCreateDto } from "../../dtos/category.dto";

export const validateCategory = (
  categoryInfo: CategoryCreateDto
): CategoryCreateDto => {
  if (Object.keys(categoryInfo).length === 0) {
    RequiredParam("Category Info");
  }

  const category = Validate(categoryInfo);
  return Object.freeze(categoryInfo);
};

function Validate({ name = RequiredParam("name") }: CategoryCreateDto) {
  if (name.length <= 2) {
    throw new InvalidPropertyError(
      "Category name langth must be major than 2 characters"
    );
  }
}
