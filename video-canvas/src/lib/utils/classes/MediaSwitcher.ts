export class MediaSwitcher {
  private inputPeerConnection: RTCPeerConnection
  private outputPeerConnection: RTCPeerConnection
  private outputStream?: MediaStream
  private videoSender?: RTCRtpSender
  private audioSender?: RTCRtpSender

  private OFFER_OPTIONS = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  }

  constructor(inputStream: MediaStream, onOutputStream: (input: MediaStream) => void) {
    this.inputPeerConnection = new RTCPeerConnection()
    this.outputPeerConnection = new RTCPeerConnection()

    this.inputPeerConnection.onicecandidate = (event) =>
      this.outputPeerConnection.addIceCandidate(event.candidate || undefined)

    this.outputPeerConnection.onicecandidate = (event) =>
      this.inputPeerConnection.addIceCandidate(event.candidate || undefined)

    this.outputPeerConnection.ontrack = (e) =>
      this.setOutputStream(e.streams[0])

    inputStream.getTracks().forEach((track) => {
      if (track.kind === 'video')
        this.videoSender = this.inputPeerConnection.addTrack(track, inputStream)
      if (track.kind === 'audio')
        this.audioSender = this.inputPeerConnection.addTrack(track, inputStream)
    })

    this.inputPeerConnection.createOffer(this.OFFER_OPTIONS).then((offer) => {
      this.inputPeerConnection.setLocalDescription(offer)
      this.outputPeerConnection.setRemoteDescription(offer)

      this.outputPeerConnection.createAnswer().then((answer) => {
        this.outputPeerConnection.setLocalDescription(answer)
        this.inputPeerConnection.setRemoteDescription(answer)

        onOutputStream(this.outputStream)
      })
    })
  }

  private setOutputStream = (stream: MediaStream) => {
    this.outputStream = stream
  }

  public getOutputStream = () => this.outputStream

  public replaceStream = (stream: MediaStream) => {
    if (
      !stream ||
      stream.constructor.name !== 'MediaStream' ||
      !this.inputPeerConnection ||
      !this.outputPeerConnection ||
      this.inputPeerConnection.connectionState !== 'connected' ||
      this.outputPeerConnection.connectionState !== 'connected'
    )
      return

    stream.getTracks().forEach((track) => {
      this.replaceTrack(track)
    })
  }

  public replaceTrack = (track: MediaStreamTrack) => {
    if (
      !track ||
      (track.constructor.name !== 'MediaStreamTrack' &&
        track.constructor.name !== 'CanvasCaptureMediaStreamTrack') ||
      !this.inputPeerConnection ||
      !this.outputPeerConnection ||
      this.inputPeerConnection.connectionState !== 'connected' ||
      this.outputPeerConnection.connectionState !== 'connected'
    )
      return

    const senders = this.inputPeerConnection
      .getSenders()
      .filter((sender) => !!sender.track && sender.track.kind === track.kind)
    if (senders.length) {
      senders[0].replaceTrack(track)
    }
  }
}