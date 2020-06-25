import { useDispatch } from 'react-redux';
import { IUser } from 'types/users';
import { RootState } from 'app/rootReducer';
import { useEffect } from 'react';
import { fetch } from 'slices/usersSlice';
import { useSelector } from './useSelector';

interface IUseUsers {
  users: { [id: number]: IUser };
}

export default function useUsers(): IUseUsers {
  const dispatch = useDispatch();
  const root = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetch({}));
  }, []);

  return { users: root.byId };
}
