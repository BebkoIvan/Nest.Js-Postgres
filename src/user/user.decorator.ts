import { createParamDecorator, Logger } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  return data ? req.user[data] : req.user;
});
