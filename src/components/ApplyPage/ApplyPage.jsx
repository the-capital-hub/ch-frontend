import ArticleOne from "./apply-page-components/articles/ArticleOne";
import ArticleTwo from "./apply-page-components/articles/ArticleTwo";
import Header from "./apply-page-components/header/Header";
import "./ApplyPage.scss";
import ArticleThree from "./apply-page-components/articles/ArticleThree";
import Form from "./apply-page-components/form/Form";

export default function App() {
  return (
    <section className="apply__wrapper">
      <div className="container-xxl page__container">
        <Header />
        <main>
          <ArticleOne />
          <ArticleTwo />
          <br />
          <ArticleThree />
          <br />
          <div className="text__center my">
            <a href="#" className="primary-btn">
              Apply to The Capital Hub
            </a>
          </div>
          <Form />
        </main>
      </div>
    </section>
  );
}
