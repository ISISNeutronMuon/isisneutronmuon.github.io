---
title: "SOAP Services"
quadrant: techniques
ring: hold
description: |
  [SOAP Services](https://en.wikipedia.org/wiki/SOAP) is a communication protocol
  for the implementation of web services. It uses an XML formatted document, called
  a WSDL, to describe the service and the available operations.
---

SOAP services have become less popular with the rise of REST API designs.
REST offers more flexibility as it permits data transfer in a variety of
formats while also using stateless operations. SOAP definitions also have to
describe the whole service thereby making changes to elements of a service,
e.g. a single operation, more difficult to change without impacting all clients.
For these reasons SOAP has been placed in hold and it is recommended that it is
not used for new projects.
