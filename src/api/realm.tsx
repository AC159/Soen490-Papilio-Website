import * as Realm from 'realm-web';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const realmApp = async () => {
  const app = new Realm.App({
    // @ts-expect-error
    id: process.env.REACT_APP_REALM_APP_ID,
  });
  const credentials = Realm.Credentials.anonymous();
  await app.logIn(credentials);

  return app;
};

export const getCollection = async (
  name: string,
  // @ts-expect-error
): MongoDBCollection<any> | undefined => {
  const app = await realmApp();
  const mongo = app.currentUser?.mongoClient(
    process.env.REACT_APP_REALM_DATA_SOURCE_NAME ?? '',
  );
  return mongo?.db(process.env.REACT_APP_REALM_DATABASE ?? '').collection(name);
};
