import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { IActionPlan } from 'types/actionPlans';

interface IUseActionPlans {
  actionPlans: { [id: number]: IActionPlan };
}

export default function useActionPlans(): IUseActionPlans {
  const root = useSelector((state: RootState) => state.actionPlans);

  return { actionPlans: root.byId };
}
