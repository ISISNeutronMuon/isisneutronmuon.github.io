---
title: "Matplotlib"
quadrant: languages-and-frameworks
ring: adopt
---

[Matplotlib](https://matplotlib.org/) is a library for static, animated and
interactive visualizations in Python.

It has [two major styles](https://matplotlib.org/stable/users/explain/figure/api_interfaces.html#api-interfaces)
of using the library:

- An explicit "Axes" interface that uses methods on a Figure or Axes object to
  create other Artists, and build a visualization step by step.
  This has also been called an "object-oriented" interface.

- An implicit "pyplot" interface that keeps track of the last Figure and Axes
  created, and adds Artists to the object it thinks the user wants.

It is recommended that the `pyplot` interface be used only for the creation of
figures and subsequent actions then be performed through the explicit `Axes` objects
themselves so it is clear which object will be affected by a given call.

*Warning*: Matplotlib expects to be used in a scripting environment where figures
are generally re-created should some aspect of the code change.
If embedded within a larger application and the figure state can be affected in other
ways then it can be challenging to have access to enough internal state to alter
the figures as required without resorting to "private" methods that are not off
limits in Python.
