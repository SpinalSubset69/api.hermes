import { InvalidPropertyError } from "../../common/exceptions/errors";
import { RequiredParam } from "../../common/exceptions/required.param";
import { ArticleCreateDto } from "../../dtos/article.dto";

export const validateArticle = (
  articleInfo: ArticleCreateDto
): ArticleCreateDto => {
  if (Object.keys(articleInfo).length === 0) {
    RequiredParam("Article Info");
  }

  const validatedArticle = ValidateArticleinfo(articleInfo);

  return Object.freeze(validatedArticle);
};

function ValidateArticleinfo({
  title = RequiredParam("Title"),
  summary = RequiredParam("Summary"),
  content = RequiredParam("Content"),
  category_id = RequiredParam("Category_Id"),
  reporter_id = RequiredParam("Reporter_id"),
}: ArticleCreateDto) {
  ValidateTitle(title);
  ValidateSummary(summary);
  ValidateContent(content);
  ValidateCategory(category_id);
  ValidateReporter(reporter_id);
  return {
    title,
    summary,
    content,
    category_id,
    reporter_id,
  } as ArticleCreateDto;
}

function ValidateTitle(title: string) {
  if (title.length <= 4) {
    throw new InvalidPropertyError("Title must be major than 4 characters");
  }
}

function ValidateSummary(summary: string) {
  if (summary.length >= 280) {
    throw new InvalidPropertyError(
      "Summary length cannot be major than 280 characters"
    );
  }

  if (summary.length <= 10) {
    throw new InvalidPropertyError("Summary must be major than 10 characters");
  }
}

function ValidateContent(content: string) {
  if (content.length <= 15) {
    throw new InvalidPropertyError("Content must be major than 15 characters");
  }
}

function ValidateCategory(category_id: number) {
  if (category_id < 0) {
    throw new InvalidPropertyError("Invalid Category");
  }
}

function ValidateReporter(reporter_id: number) {
  if (reporter_id < 0) {
    throw new InvalidPropertyError('Invalid reporter');
  }
}
