import React, { useState, useEffect } from 'react';
import useUsers from 'hooks/useUsers';
import { useDispatch } from 'react-redux';
import { show } from 'slices/usersSlice';
import Select from 'react-select';
import {
  create as createCareJourney,
  fetch as fetchCareJourney,
} from 'slices/careJourneysSlice';
import { create as createActionPlan } from 'slices/actionPlansSlice';
import useCareJourneys from 'hooks/useCareJourneys';
import useActionPlans from 'hooks/useActionPlans';
import s from './AdminPanel.module.scss';

type OptionType = {
  value: string;
  label: string;
};

const stageOptions = [
  { value: 'independent', label: 'Independent' },
  { value: 'interdependent', label: 'Interdependent' },
  { value: 'dependent', label: 'Dependent' },
  { value: 'crisis', label: 'Crisis' },
  { value: 'griefing', label: 'Griefing' },
];

export default function AdminPanel() {
  const dispatch = useDispatch();
  const { users } = useUsers();
  const { careJourneys } = useCareJourneys();
  const { actionPlans } = useActionPlans();
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedCareJourneyId, setSelectedCareJourneyId] = useState<number>(0);
  const [
    newCareJourneyCareSituation,
    setNewCareJourneyCareSituation,
  ] = useState<string>('');
  const [newCareJourneyGoals, setNewCareJourneyGoals] = useState<string>('');
  const [newCareJourneyStage, setNewCareJourneyStage] = useState<{
    value: string;
    label: string;
  }>(stageOptions[0]);
  const [newActionPlanTitle, setNewActionPlanTitle] = useState<string>('');

  const createNewCareJourney = () => {
    dispatch(
      createCareJourney({
        userId: selectedUserId,
        careSituation: newCareJourneyCareSituation,
        goals: newCareJourneyGoals,
        stage: newCareJourneyStage.value,
      }),
    );

    setNewCareJourneyGoals('');
    setNewCareJourneyCareSituation('');
    setNewCareJourneyStage(stageOptions[0]);
  };

  const createNewActionPlan = () => {
    dispatch(
      createActionPlan({
        userId: selectedUserId,
        careJourneyId: selectedCareJourneyId,
        title: newActionPlanTitle,
      }),
    );
  };

  const renderNewCareJourney = (
    <div className={s.newCareJourney}>
      <div className={s.subtitle}>Create New Care Journey</div>
      <textarea
        placeholder='Care situation'
        cols={48}
        rows={5}
        value={newCareJourneyCareSituation}
        onChange={evt => setNewCareJourneyCareSituation(evt.target.value)}
      />
      <textarea
        placeholder='Goals'
        cols={48}
        rows={5}
        value={newCareJourneyGoals}
        onChange={evt => setNewCareJourneyGoals(evt.target.value)}
      />
      <Select
        options={stageOptions}
        value={newCareJourneyStage}
        onChange={val => {
          const v = val as any;
          setNewCareJourneyStage({
            value: v.value,
            label: v.label,
          });
        }}
      />
      <button type='button' onClick={createNewCareJourney}>
        Create
      </button>
    </div>
  );

  const renderNewActionPlan = (
    <div className={s.newActionPlan}>
      <input
        type='text'
        value={newActionPlanTitle}
        placeholder='New Action Plan'
        onChange={evt => setNewActionPlanTitle(evt.target.value)}
      />
      <button onClick={createNewActionPlan} type='button'>
        Add Plan
      </button>
    </div>
  );

  const renderExistingActionPlan = (actionPlanId: number) => {
    const actionPlan = actionPlans[actionPlanId];

    return (
      <div key={actionPlanId} className={s.existingActionPlan}>
        <div className={s.title}>{actionPlan.title}</div>
        <div className={s.status}>{actionPlan.status}</div>
      </div>
    );
  };

  const renderExistingActionPlans = selectedUserId > 0 &&
    selectedCareJourneyId > 0 && (
      <div className={s.existingActionPlans}>
        <div className={s.subtitle}>Existing Action Plans</div>
        <div>
          {careJourneys[selectedCareJourneyId].actionPlanIds
            .slice()
            .sort((a: number, b: number) => b - a)
            .map((x: number) => renderExistingActionPlan(x))}
        </div>
      </div>
    );

  const renderExistingCareJourney = (careJourneyId: number) => {
    const careJourney = careJourneys[careJourneyId];

    return (
      <div
        key={careJourneyId}
        className={s.careJourney}
        onClick={() => setSelectedCareJourneyId(careJourneyId)}
      >
        <div>{`Situataion: ${careJourney.careSituation}`}</div>
        <div>{`Goals: ${careJourney.goals}`}</div>
        <div>{`Stage: ${careJourney.stage}`}</div>
        <div>
          {selectedCareJourneyId === careJourneyId && renderNewActionPlan}
        </div>
        <div>
          {selectedCareJourneyId === careJourneyId && renderExistingActionPlans}
        </div>
      </div>
    );
  };

  const renderExistingCareJourneys = selectedUserId > 0 && (
    <div className={s.existingCareJourneys}>
      <div className={s.subtitle}>Existing Care Journeys</div>
      <div>
        {users[selectedUserId].careJourneyIds
          .slice()
          .sort((a: number, b: number) => b - a)
          .map((x: number) => renderExistingCareJourney(x))}
      </div>
    </div>
  );

  const renderUsers = Object.keys(users).map((userId: string) => {
    const user = users[Number(userId)];

    return (
      <div
        onClick={() => setSelectedUserId(Number(userId))}
        key={userId}
        className={s.user}
      >
        {user.name}
        {selectedUserId === Number(userId) && renderNewCareJourney}
        {selectedUserId === Number(userId) && renderExistingCareJourneys}
      </div>
    );
  });

  useEffect(() => {
    if (selectedUserId < 1) return;
    dispatch(show({ userId: selectedUserId }));
  }, [dispatch, selectedUserId]);

  useEffect(() => {
    if (selectedUserId < 1 || selectedCareJourneyId < 1) return;
    dispatch(
      fetchCareJourney({
        userId: selectedUserId,
        careJourneyId: selectedCareJourneyId,
      }),
    );
  }, [
    dispatch,
    selectedCareJourneyId,
    selectedUserId,
    setSelectedCareJourneyId,
  ]);

  return (
    <div className={s.container}>
      <div className={s.header}>Admin Panel</div>
      <div>{renderUsers}</div>
    </div>
  );
}
