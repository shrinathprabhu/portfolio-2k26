---
title: "How I Built a Chrome Extension Wallet for 13 Blockchains"
description: "Architecture decisions behind building a non-custodial sidebar wallet: provider injection patterns, MetaMask compatibility, Manifest V3 constraints, content script ↔ service worker communication, and unified balance management across 13 chains."
date: 2026-05-01
category: "Chrome Extensions"
readingTime: "12 min"
featured: true
keywords: ["Chrome Extension", "wallet", "Manifest V3", "Vue 3", "provider injection", "MetaMask", "Web3", "viem"]
draft: true
---

_Coming soon._

This post will cover the architecture decisions behind building the Arcana Chrome Extension Wallet — a non-custodial sidebar wallet supporting 13 blockchains with dApp injection, unified balance management, and MetaMask-compatible provider injection.

## Topics covered

- Why sidebar, not popup
- Provider injection: the `window.ethereum` and `announceProvider` patterns
- Content script ↔ service worker communication in Manifest V3
- Unified cross-chain balance management
- Building MetaMask compatibility from scratch
- The path from Chrome Extension to TypeScript SDK
