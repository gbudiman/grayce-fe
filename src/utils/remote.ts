interface IRemote {
  apiUrl: string;
  isLocal: boolean;
}

export default function remote(): IRemote {
  const isLocal = Boolean(window.location.host.match(/localhost/));
  const rootUrl = '//localhost:3000';
  const apiUrl = `${rootUrl}`;

  return {
    apiUrl,
    isLocal,
  };
}
