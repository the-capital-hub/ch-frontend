import { useState } from "react";
import "./ChatSearch.scss";
import searchIcon from "../../../../Images/Chat/Search.svg";
import { Link } from "react-router-dom";
import { getSearchResultsAPI } from "../../../../Service/user";
import { selectLoggedInUserId } from "../../../../Store/features/user/userSlice";
import { useSelector } from "react-redux";
import { debounce } from "../../../../utils/debounce";
import OnboardingSwitch from "../../../../components/Investor/InvestorNavbar/OnboardingSwitch/OnboardingSwitch";

const ChatSearch = () => {
  const [inputOnFocus, setInputOnFocus] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const loggedInUser = useSelector((state)=> state.user.loggedInUser)

  const delayedSearchInputHandler = debounce(async ({ target }) => {
    if (!target.value) return setSearchSuggestions(null);
    try {
      const { data } = await getSearchResultsAPI(target.value);
      setSearchSuggestions(
        data?.users?.filter((user) => user._id !== loggedInUserId && loggedInUser.connections.includes(user._id))
      );
    } catch (error) {
      console.error("Error getting search results : ", error);
    } finally {
      setLoading(false);
    }
  }, 500);

  const searchInputBlurHandler = () => {
    setTimeout(() => {
      if (mobileSearch) setMobileSearch(false);
      setInputOnFocus(false);
      setSearchSuggestions(false);
    }, 500);
  };

  return (
    <>
     <div className="chat_search_container">
     <div className="theme_switch_chat"><OnboardingSwitch/></div>
        <h1 className="chat_title">Chats</h1>
        <div className="inputs">
          <div className="search_chat">
            <img src={searchIcon} alt="Search user" width={20} height={20} />
            <input
              type="search"
              className="w-100 text-black"
              placeholder="Search"
              // value={searchInput}
              onChange={(e) => {
                delayedSearchInputHandler(e);
                setLoading(true);
              }}
              onFocus={() => setInputOnFocus(true)}
              onBlurCapture={searchInputBlurHandler}
            />
          </div>
          <div className="search-results-wrapper">
            {inputOnFocus && searchSuggestions && !mobileSearch && (
              <div className="search_results rounded-4 border shadow-sm p-4 position-absolute">
                {!loading ? (
                  searchSuggestions && (
                    <>
                      {!searchSuggestions?.length && (
                        <h6 className="h6 text-center w-100 text-secondary">
                          No Suggestions.
                        </h6>
                      )}
                      {searchSuggestions
                        ?.slice(0, 5)
                        .map(({ firstName, lastName, _id }) => (
                          <Link
                            key={_id}
                            className="single_result text-body"
                            to={`/chats?userId=${_id}`}
                          >
                            {firstName} {lastName}
                          </Link>
                        ))}
                    </>
                  )
                ) : (
                  <div class="d-flex justify-content-center">
                    <div class="spinner-border text-secondary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSearch;
