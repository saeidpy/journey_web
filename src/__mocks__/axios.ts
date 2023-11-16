// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: jest.fn().mockResolvedValue({data: {}}),
  post: jest.fn().mockResolvedValue({data: {}}),
  create: jest.fn().mockReturnThis(),
}
