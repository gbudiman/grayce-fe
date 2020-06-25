import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { ICareJourney } from 'types/careJourneys';

interface IUseCareJourneys {
  careJourneys: { [id: number]: ICareJourney };
}

export default function useCareJourneys(): IUseCareJourneys {
  const root = useSelector((state: RootState) => state.careJourneys);

  return { careJourneys: root.byId };
}
