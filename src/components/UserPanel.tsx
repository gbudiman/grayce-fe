import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import useUsers from 'hooks/useUsers';
import { regularView } from 'slices/usersSlice';
import useCareJourneys from 'hooks/useCareJourneys';
import useActionPlans from 'hooks/useActionPlans';
import Toggle from 'react-toggle';
import { fromPairs } from 'lodash';
import { EActionPlanStatus } from 'types/actionPlans';
import { toggle } from 'slices/actionPlansSlice';
import s from './UserPanel.module.scss';

export default function UserPanel() {
  const dispatch = useDispatch();
  const { users } = useUsers();
  const { careJourneys } = useCareJourneys();
  const { actionPlans } = useActionPlans();
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [apStates, setApStates] = useState<{[id: number]: boolean}>({});

  const toggleStatus = (id: number, val: boolean) => {
    dispatch(toggle({
      actionPlanId: id,
      status: val ? 'complete' : 'incomplete',
    }))
  }

  const renderActionPlan = (id: number) => {
    const actionPlan = actionPlans[id];

    return (
      <div className={s.actionPlan} key={id}>
        <div className={s.toggle}>
          <Toggle
            checked={apStates[id]}
            onChange={evt => toggleStatus(id, evt.target.checked)}
          />
        </div>
        <div className={s.title}>{actionPlan.title}</div>
      </div>
    )
  };

  const renderActionPlans = () => {
    if (selectedUserId < 1) return '';

    return users[selectedUserId].careJourneyId ? (
      <div className={s.careJourneys}>
        <div>
          Care Situation: &nbsp;
          {careJourneys[users[selectedUserId].careJourneyId!].careSituation}
        </div>
        <div>
          Goals: &nbsp;
          {careJourneys[users[selectedUserId].careJourneyId!].goals}
        </div>
        <div>
          {careJourneys[
            users[selectedUserId].careJourneyId!
          ].actionPlanIds.map((x: number) => renderActionPlan(x))}
        </div>
      </div>
    ) : (
      <div className={s.careJourneys}>No Care Journey for this user</div>
    );
  };

  const renderUsers = Object.keys(users).map((userId: string) => {
    const user = users[Number(userId)];

    return (
      <div
        onClick={() => setSelectedUserId(Number(userId))}
        key={userId}
        className={s.user}
      >
        {user.name}
        {(Number(userId) === selectedUserId) && renderActionPlans()}
      </div>
    );
  });

  useEffect(() => {
    if (selectedUserId < 1) return;
    dispatch(regularView({ userId: selectedUserId }));
  }, [dispatch, selectedUserId]);

  useEffect(() => {
    setApStates(
      fromPairs(Object.keys(actionPlans).map((x: string) => [
        x,
        actionPlans[Number(x)].status === EActionPlanStatus.Complete,
      ])),
    );
  }, [dispatch, actionPlans]);

  return (
    <div className={s.container}>
      <div className={s.header}>Select Current User</div>
      <div>{renderUsers}</div>
    </div>
  );
}
