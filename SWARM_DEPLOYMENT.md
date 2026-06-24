# Docker Swarm Deployment Guide

This guide explains how to deploy the QueueLab stack using Docker Swarm. Unlike other orchestrators, Docker Swarm runs directly on your Docker hosts without requiring a separate "main orchestrator" VM.

## 🧠 How It Works

- **Built-in Orchestration**: Swarm mode is built into Docker Engine.
- **Manager Nodes**: Run the control plane (scheduling, API, state, etc.). A minimum of 3 managers is recommended for High Availability (HA).
- **Worker Nodes**: Run your actual container workloads.
- **All-in-One**: In small setups, a single node can act as both manager and worker.

| Role | What it does | Recommended count | Can run services? |
|------|--------------|-------------------|-------------------|
| **Manager** | Control plane & Orchestration | 3 or 5 (odd number) | Yes |
| **Worker** | Container workloads | As many as needed | Yes |

## 🚀 Setup a 3-Node Cluster

### 1. Provision VMs
Create 3 VMs (e.g., on DigitalOcean, Hetzner, AWS) and install Docker on all of them.

### 2. Initialize the Swarm
On the **first manager node**, run:
```bash
docker swarm init --advertise-addr <MANAGER-IP>
```
Copy the join token command provided in the output.

### 3. Join Other Nodes
On the other VMs, run the join command you copied:
```bash
docker swarm join --token <TOKEN> <MANAGER-IP>:2377
```

## 📦 Deploying the Stack

### 1. Preparation
Ensure you have built and pushed your images to a registry (e.g., Docker Hub, GitHub Container Registry).

> **Note**: The `docker-stack.yml` uses placeholder image names. Update them with your actual registry URIs before deploying.

### 2. Deploy
Run the following command on a manager node:
```bash
docker stack deploy -c docker-stack.yml queuelab
```

### 3. Verify
Check the status of your services:
```bash
docker stack services queuelab
docker service ls
```

## 🔧 Useful Commands

- **List nodes**: `docker node ls`
- **Check service logs**: `docker service logs queuelab_frontend`
- **Scale a service**: `docker service scale queuelab_frontend=5`
- **Remove the stack**: `docker stack rm queuelab`

---
*Generated for QCX Location Intelligence Swarm Setup.*

## 🌐 Inter-Service & Inter-Stack Connectivity

### 1. Connecting within the same Stack
Services in the same `docker-stack.yml` (e.g., `frontend` and `backend`) communicate using their service names as hostnames over the `app-network` (which uses the `overlay` driver).
- **Example**: Frontend connects to Backend at `http://backend:8000`.

### 2. Connecting to "Other Dockers" (External Stacks)
To connect to services running in a **different** Swarm stack, you must use a shared external network.

#### A. Create a shared network
Run this on a manager node:
```bash
docker network create --driver overlay --attachable shared-network
```

#### B. Update your stack configurations
Add the shared network to both stacks:
```yaml
# stack-a.yml
services:
  service-a:
    networks:
      - shared-network

networks:
  shared-network:
    external: true
```

Now, `service-a` in Stack A can reach `service-b` in Stack B using its service name (e.g., `http://service-b:port`).

### 3. Connecting to Containers on the same Host
If you have standalone containers (non-Swarm) on the same host that you need to reach from the Swarm:
1. Ensure the Swarm network is created with `--attachable`.
2. Manually connect the standalone container to the Swarm network:
   ```bash
   docker network connect shared-network my-standalone-container
   ```

---
*Updated connectivity section for inter-stack communication.*

## 🏗 The Unified QCX Ecosystem Stack

The `docker-stack.yml` is configured to deploy the entire QCX ecosystem as a single unit. This ensures all intelligence components (EVA, QCX, FIX) are interconnected and high-available.

### 🧩 Ecosystem Components

- **Queuelab (Frontend/Backend)**: The primary user interface and API gateway.
- **Core (QCX)**: The environment-aware planet computer and central data hub.
- **EVA**: The planet-scale data scientist agent service.
- **FIX**: The energy-based evaluation and alignment benchmarking service.
- **Prototype**: The experimental web interface for rapid feature testing.

### 🔗 Service Discovery
Within the Swarm, services communicate using their functional names. No hardcoded IPs or external load balancers are required for internal traffic:
- Queuelab -> Core: `http://core:8000`
- Core -> EVA: `http://eva:8000`
- Core -> FIX: `http://fluidity-index-benchmark:8000`

### 🛠 Deployment Instructions
To deploy the entire ecosystem:
```bash
docker stack deploy -c docker-stack.yml qcx-ecosystem
```

---
*Generated for the unified QCX Swarm Ecosystem.*
