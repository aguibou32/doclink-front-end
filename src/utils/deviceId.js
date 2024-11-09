import FingerprintJS from '@fingerprintjs/fingerprintjs'  

const fpPromise = FingerprintJS.load()

const getDeviceId = async () => {
  const fp = await fpPromise  
  const result = await fp.get()
  return result.visitorId
}

export default getDeviceId