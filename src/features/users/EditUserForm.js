import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4, 12}$/

const EditUserForm = ({ user }) => {

  console.log(user)

  const [updateUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateUserMutation();

  const [deleteUser, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delError
  }] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [userName, setUserName] = useState(user.username);
  const [validUserName, setValidUserName] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUserName(USER_REGEX.test(userName));
  }, [userName])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password])

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUserName('')
      setPassword('')
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onUserNameChanged = e => setUserName(e.target.value)
  const onUserPasswordChanged = e => setPassword(e.target.value)

  const onRolesChanged = e => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    )
    setRoles(values)
  }

  const onActiveChanged = () => setActive(prev => !prev)

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, userName, password, roles, active })
    } else {
      await updateUser({ id: user.id, userName, roles, active, })
    }
  }

  const deleteUserClicked = async () => {
    await deleteUser({ id: user.id })
  }

  

  return (
    <div>EditUserForm</div>
  )
}

export default EditUserForm