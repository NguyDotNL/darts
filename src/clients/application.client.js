import { db } from '@/plugins/firebase'

const ApplicationClient = {
  resetApplication: () => {
    db.ref().set(null)
  },
}

export default ApplicationClient
