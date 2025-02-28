import React, { useContext } from 'react';
import UserManagement from '../../components/UserManagement';
import CreateUserDrawer from '../../components/CreateUserDawer';
import EditUserDrawer from '../../components/EditUserDrawer';
import useDrawerSize from '../../utils/useDrawerSize';
import { EventContext } from '../../context/EventContext';

const UserManagementPage = () => {
  const { state, dispatch } = useContext(EventContext);

  const drawerSize = useDrawerSize();

  const handleEditUser = (user) => {
    dispatch({ type: 'OPEN_DRAWER', drawer: 'isEditUserDrawer' });
    dispatch({ type: 'SET_SELECTED_USER', selectedUserForEdit: user });
  };

  //   const handleDeleteUser = (userId) => {
  //     dispatch({ type: 'DELETE_USER', userId });
  //   };

  const handleAssignUser = (user, categoryKey) => {
    dispatch({ type: 'ASSIGN_USER', user, categoryKey });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">사용자 관리</h1>
      <UserManagement
        users={state.users}
        dispatch={dispatch}
        onAssignUser={handleAssignUser}
        onEditUser={handleEditUser}
        enableAssignment={false}
        pageSize={10}
      />

      <CreateUserDrawer
        isOpen={state.drawers.isCreateUserDrawer}
        onClose={() =>
          dispatch({ type: 'CLOSE_DRAWER', drawer: 'isCreateUserDrawer' })
        }
        onSubmit={(newUser) => dispatch({ type: 'CREATE_USER', user: newUser })}
      />

      <EditUserDrawer
        size={drawerSize}
        isOpen={state.drawers.isEditUserDrawer}
        initialUser={state.selectedUserForEdit}
        onClose={() =>
          dispatch({ type: 'CLOSE_DRAWER', drawer: 'isEditUserDrawer' })
        }
        onDelete={(userId) => dispatch({ type: 'DELETE_USER', userId })}
        onSubmit={(user) =>
          dispatch({
            type: 'UPDATE_USER',
            selectedUserForEdit: user,
            drawer: 'isEditUserDrawer',
          })
        }
      />
    </div>
  );
};

export default UserManagementPage;
