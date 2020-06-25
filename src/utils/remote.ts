interface IRemote {
  apiUrl: string;
  isLocal: boolean;
}

export default function remote(): IRemote {
  const isLocal = Boolean(window.location.host.match(/localhost/));
  const rootUrl = isLocal ? '//localhost:3000' : '//grayce-be.herokuapp.com';
  const apiUrl = `${rootUrl}`;

  return {
    apiUrl,
    isLocal,
  };
}
