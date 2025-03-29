
import PageTitle from '../../../components/page-title'
import usersGlobalStore, { UserStoreType } from '../../../store/users-store'
import { getDateTimeFormat } from '../../../helpers/date-time-formats'

const ProfilePage = () => {
  const {currentUser} : UserStoreType = usersGlobalStore() as UserStoreType
  
  

  const renderUserProperty = (label: string, value: any) => {
    return (
        <div className="flex flex-col text-sm">
            <span className='font-bold underline'>{label}</span>
            <span>{value}</span>
        </div>
    )
}
  return (
    <div>
      <PageTitle title='profile' />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {renderUserProperty("ID", currentUser?._id)}
        {renderUserProperty("Name", currentUser?.name)}
        {renderUserProperty("Email", currentUser?.email)}
        {renderUserProperty("Joined", getDateTimeFormat(currentUser!.createdAt))}
      </div>
    </div>
  )
}

export default ProfilePage