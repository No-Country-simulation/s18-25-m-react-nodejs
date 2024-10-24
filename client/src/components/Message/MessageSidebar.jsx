import { getRoleColor } from "../../helpers/get-role-color";

const users = [
  {
    name: "Eugenea Quevedo",
    role: ['Backend'],
    img: "https://s3-alpha-sig.figma.com/img/2aaf/09de/c80b069b0f6f76a9f44fffc43c81b19d?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n1e2kUX8RIJy3IgpgPeVDFgFusxM3aYOiP3DX5WyyuKkq0qzj3oEbqIPMI8M7KNtLgvAs6ObcvqFyQcmQX4GLhP5ja7Uz5lQ-oHODaCl1l43GkiW9~SKddvK0wfhAOj~ZX7vDlmrmM7cTo45iBhNfIkRtM99t~2SIDPBrGjUXGGuXhsGcXuS7ObVDopt2dhq5ENTJV63kreRWq69mhzwYFPMBM9NimFdSm46BYPCglhbfXnkk5TNAezg2ZQB7V1oMi5~o~6r-nHF3edevMXE0SqQWjmEOU2ghL2lStXck12aUvbR-Y8XJwJApOyUGmb7ncRHD6k8tvPEhyFdZ2fCnQ__",
  },
  {
    name: "Angela Leiva",
    role: ['Frontend'],
    img: "https://s3-alpha-sig.figma.com/img/b507/7505/752b6a568f75b00b6d076c212afff6a2?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iJGnKuRHHC7TYrNV3Kkir6iQ~~8Xb5CYRBX~dnC8cIwnMqtqOq1Y5FfeH8qllmg50DLJ3cxSc1xn3hsLDaAsxqwsAwZRe5o3XQu9AzgqSLSUXpAPyjHGVfvi5BeZ-cfJxl3309-EViM9117pV6Hlorh1dakdDKlWZ4oXAc7f7L5s9S4SydYcca6Qfp4BIrSepSASwwySGwdIdV1aEz4ixj4j8Ra~jGJwPbf9c0G0Fr-THWo~h8QTEgQik7BuWME0G6HuOCldcBh4GucfwUwX2ZrFQoCoRDgT3S60UU8l4qtSgxlNB7yCToUd~nJoE6u3bM1Mo3bPl88xEw6ienGwoA__",
  },
  {
    name: "Carlitos Garris",
    role: ['Devops', 'Tester'],
    img: "https://s3-alpha-sig.figma.com/img/9541/b04a/e27668c7245f78d0279332d12849d380?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dGAHYP0ehDF31phhGiEJOs9i6qMnBfnNLbI-Sy89DXXcg-MOJJLtQM-0uvo2bBhC~y9aIYQZCP9~K0fsP1Bzaa~wr95yy3jPXH0ASOqGU5q3o5Z5LTZ4Mp0izzlr~0UJQOLh5eLxJs0QQMJ8q3F3l03MbpkVfq~jiRCrWlXfjaX7p~Wv1DlG-OdTij7FAhPY0zIBFhw1WLoLVGIh~QB4f3PWnCJI-HC2Bqw~QZBw6a9grGG1TFeaA7CEvw847ChQOeg51tsi8Pr1MwcCcTj3C9do5dtSE4G7bG7OkLSW23~xFT0SG6j4he0ACSc6okdZ~2AxPSZKhEtt8JIbeKVtEg__",
  },
  {
    name: "Alverto Ignacio Gonzales",
    role: ['Devops', 'Frontend', 'Backend'],
    img: "https://s3-alpha-sig.figma.com/img/4773/dcca/19627af031de09d7cfa7505e80c8eb7b?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S~vMzesL4Mh8AKgAgZqYf3Fg3gsBTe~bEEwKF2GXVDmlY~9j0L5WoEyCoqJc3wuxtAwd1ZPEEtJ322e8XNj7PZiaMk~J3pkilfN6UcCFRpeWcnnRX8Miv9hsWSyWxTvQ6z0~Seo7CbJDmCOFBU4UYMvs0bgcYmbRqmqR5NffrwSPwyLULAqABlF~ZUYOQLreVd4zN8FkwiObt8InqeZKNPLmFC3KmEGN6aPJQG4uSU4pZCzyzw12yc5~Xo6nYwMLvKsSmXLw3fzcJFNMcdugY2Jg6vpzus~FxCxHbwSdPHJ2q6voHqka-kh1-vtNNLmJO1TZv0b7igXUsc55qjNwMA__",
  },
];

export const MessageSidebar = () => {
  return (
    <div className="w-1/4 bg-gray-800 p-4">
      {users.map((user, index) => (
        <div
          key={index}
          className="flex items-center mb-4 p-2 hover:bg-green-900 hover:opacity-80 rounded-lg"
        >
          <img
            src={user.img}
            alt={user.name}
            className="w-12 h-12 rounded-[10px] mr-5"
          />
          <div>
            <h2 className="font-bold">{user.name}</h2>
            <div>
              {user.role.map((role, roleIndex) => (
                <span
                  key={roleIndex}
                  className={`text-sm px-2 py-1 rounded-lg mt-2 mr-2`}
                  style={{ backgroundColor: getRoleColor(role) }}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSidebar;
