import { SearchBox as SearchBoxController } from "@coveo/headless";
import { useEffect, useState, FunctionComponent } from 'react';

interface SearchBoxProps {
  controller: SearchBoxController;
}
const SearchBox: FunctionComponent<SearchBoxProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);
  const suggestionStyle = {
    cursor: 'pointer',
  };

  useEffect(() => {
    controller.subscribe(() => setState(controller.state));
  }, [controller]);

  return (
    <div className="search-box">
      <input
        placeholder="Search..."
        value={state.value}
        onChange={(e) => controller.updateText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && controller.submit()}
      />
      {state.suggestions.length > 0 && ( 
        <ul>
          {state.suggestions.map((suggestion) => {
            return (
              <li
                style={suggestionStyle}
                key={suggestion.rawValue}
                onClick={() => controller.selectSuggestion(suggestion.rawValue)}
                dangerouslySetInnerHTML={{__html: suggestion.highlightedValue}}
              ></li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;