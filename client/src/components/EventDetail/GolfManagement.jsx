const GolfManagement = ({ data, onAddGroup }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">골프 조 편성</h2>
        <button
          onClick={onAddGroup}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          조 추가하기
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.groups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-900">{group.name}</h3>
              <span className="text-sm text-gray-500">
                Tee-off {group.teeTime}
              </span>
            </div>
            <ul className="space-y-3">
              {group.members.map((member) => (
                <li
                  key={member.id}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-700">{member.name}</span>
                  <span className="text-sm text-gray-500">
                    HC {member.handicap}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GolfManagement;
