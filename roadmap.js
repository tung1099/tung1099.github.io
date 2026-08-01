/* Lộ trình học — sửa file này để thêm/bớt bài dự định viết.
   slug trùng với id của một bài đã đăng thì tự động thành liên kết. */
window.ROADMAP = [
  {
    "level": "Fresher",
    "goal": "Mục tiêu: đọc hiểu code người khác viết, tự làm được một CRUD hoàn chỉnh và biết dùng công cụ. Chưa cần tối ưu gì cả.",
    "groups": [
      {
        "topic": "Java core",
        "items": [
          {
            "slug": "jvm-jdk-jre-khac-nhau",
            "title": "JVM, JDK, JRE khác nhau chỗ nào"
          },
          {
            "slug": "kieu-du-lieu-va-autoboxing",
            "title": "Kiểu nguyên thuỷ, wrapper và bẫy autoboxing"
          },
          {
            "slug": "string-immutable-va-string-pool",
            "title": "String bất biến và String pool"
          },
          {
            "slug": "oop-bon-tinh-chat",
            "title": "Bốn tính chất OOP qua ví dụ thật"
          },
          {
            "slug": "interface-hay-abstract-class",
            "title": "Interface hay abstract class"
          },
          {
            "slug": "chon-list-set-map",
            "title": "List, Set hay Map — chọn cái nào"
          },
          {
            "slug": "hashmap-ben-trong",
            "title": "HashMap chạy thế nào bên trong"
          },
          {
            "slug": "equals-va-hashcode",
            "title": "equals và hashCode: hợp đồng ngầm"
          },
          {
            "slug": "checked-vs-unchecked-exception",
            "title": "Checked và unchecked exception"
          },
          {
            "slug": "stream-api-nhap-mon",
            "title": "Stream API nhập môn"
          },
          {
            "slug": "optional-dung-cho-dung",
            "title": "Optional dùng cho đúng"
          }
        ]
      },
      {
        "topic": "Database & SQL",
        "items": [
          {
            "slug": "sql-select-va-join",
            "title": "SELECT và bốn kiểu JOIN"
          },
          {
            "slug": "khoa-chinh-khoa-ngoai",
            "title": "Khoá chính, khoá ngoại và ràng buộc"
          },
          {
            "slug": "group-by-va-ham-tong-hop",
            "title": "GROUP BY và các hàm tổng hợp"
          },
          {
            "slug": "thu-tu-thuc-thi-cua-sql",
            "title": "SQL chạy theo thứ tự nào"
          },
          {
            "slug": "index-la-gi",
            "title": "Index là gì và khi nào nên tạo"
          },
          {
            "slug": "transaction-va-acid",
            "title": "Transaction và ACID"
          },
          {
            "slug": "tu-jdbc-den-jpa",
            "title": "Từ JDBC tới JPA"
          }
        ]
      },
      {
        "topic": "Mạng máy tính",
        "items": [
          {
            "slug": "request-http-di-qua-dau",
            "title": "Một request HTTP đi qua những đâu"
          },
          {
            "slug": "ma-trang-thai-http",
            "title": "Mã trạng thái HTTP dùng cho đúng"
          },
          {
            "slug": "rest-api-thiet-ke-co-ban",
            "title": "Thiết kế REST API cơ bản"
          },
          {
            "slug": "json-va-serialization",
            "title": "JSON và chuyện serialize trong Java"
          }
        ]
      },
      {
        "topic": "Docker & CI/CD",
        "items": [
          {
            "slug": "container-khac-vm-cho-nao",
            "title": "Container khác máy ảo chỗ nào"
          },
          {
            "slug": "chay-container-dau-tien",
            "title": "Chạy container đầu tiên"
          },
          {
            "slug": "dockerfile-co-ban",
            "title": "Dockerfile cơ bản cho ứng dụng Java"
          }
        ]
      },
      {
        "topic": "Công cụ",
        "items": [
          {
            "slug": "git-cho-nguoi-moi",
            "title": "Git đủ dùng cho người mới"
          },
          {
            "slug": "maven-hay-gradle",
            "title": "Maven và Gradle: hiểu vòng đời build"
          },
          {
            "slug": "debug-trong-intellij",
            "title": "Debug trong IntelliJ cho ra hồn"
          }
        ]
      }
    ]
  },
  {
    "level": "Junior",
    "goal": "Mục tiêu: tự nhận một tính năng và làm trọn vẹn, có test, biết vì sao code của mình chậm và sửa được.",
    "groups": [
      {
        "topic": "Spring",
        "items": [
          {
            "slug": "spring-di-va-ioc",
            "title": "Dependency Injection và IoC container"
          },
          {
            "slug": "spring-component-service-repository",
            "title": "@Component, @Service, @Repository khác nhau chỗ nào"
          },
          {
            "slug": "transactional-hoat-dong-the-nao",
            "title": "@Transactional hoạt động thế nào"
          },
          {
            "slug": "jpa-n-plus-1",
            "title": "Bẫy N+1 trong JPA và cách phát hiện"
          },
          {
            "slug": "validation-va-xu-ly-loi",
            "title": "Validation và xử lý lỗi tập trung"
          },
          {
            "slug": "profile-va-cau-hinh",
            "title": "Profile và quản lý cấu hình"
          },
          {
            "slug": "junit-mockito-test-cho-tu-te",
            "title": "JUnit + Mockito: viết test cho tử tế"
          }
        ]
      },
      {
        "topic": "Database & SQL",
        "items": [
          {
            "slug": "index-tao-roi-van-cham",
            "title": "Đã tạo index rồi mà query vẫn chậm"
          },
          {
            "slug": "doc-explain-plan",
            "title": "Đọc EXPLAIN plan"
          },
          {
            "slug": "isolation-level-va-deadlock",
            "title": "Isolation level và deadlock"
          },
          {
            "slug": "phan-trang-dung-cach",
            "title": "Phân trang đúng cách (đừng dùng OFFSET lớn)"
          },
          {
            "slug": "connection-pool-hikaricp",
            "title": "Connection pool và HikariCP"
          }
        ]
      },
      {
        "topic": "Redis",
        "items": [
          {
            "slug": "redis-cac-kieu-du-lieu",
            "title": "Các kiểu dữ liệu trong Redis và dùng khi nào"
          },
          {
            "slug": "cache-aside-va-ba-cai-bay",
            "title": "Cache-aside với Redis và ba cái bẫy"
          },
          {
            "slug": "ttl-va-chinh-sach-eviction",
            "title": "TTL và chính sách eviction"
          },
          {
            "slug": "khoa-phan-tan-bang-redis",
            "title": "Khoá phân tán bằng Redis"
          }
        ]
      },
      {
        "topic": "Kafka",
        "items": [
          {
            "slug": "pub-sub-va-event-driven",
            "title": "Pub/Sub và kiến trúc event-driven"
          },
          {
            "slug": "kafka-topic-partition-offset",
            "title": "Topic, partition, offset — mô hình cơ bản"
          },
          {
            "slug": "producer-va-consumer-dau-tien",
            "title": "Producer và consumer đầu tiên với Spring"
          },
          {
            "slug": "kafka-so-voi-rabbitmq",
            "title": "Kafka so với RabbitMQ: chọn cái nào"
          }
        ]
      },
      {
        "topic": "Docker & CI/CD",
        "items": [
          {
            "slug": "docker-multi-stage-va-layer",
            "title": "Multi-stage build và thứ tự layer trong Dockerfile"
          },
          {
            "slug": "docker-compose-cho-moi-truong-dev",
            "title": "Docker Compose cho môi trường dev"
          },
          {
            "slug": "github-actions-pipeline-dau-tien",
            "title": "Pipeline GitHub Actions đầu tiên"
          },
          {
            "slug": "quan-ly-tag-va-registry",
            "title": "Quản lý tag image và registry"
          }
        ]
      },
      {
        "topic": "Mạng máy tính",
        "items": [
          {
            "slug": "tcp-bat-tay-ba-buoc",
            "title": "TCP: bắt tay ba bước và keep-alive"
          },
          {
            "slug": "dns-hoat-dong-the-nao",
            "title": "DNS hoạt động thế nào"
          },
          {
            "slug": "https-va-tls",
            "title": "HTTPS và TLS giải thích đơn giản"
          },
          {
            "slug": "cors-vi-sao-luon-loi",
            "title": "CORS và vì sao nó luôn lỗi"
          }
        ]
      },
      {
        "topic": "Bảo mật",
        "items": [
          {
            "slug": "xac-thuc-va-phan-quyen",
            "title": "Xác thực và phân quyền khác nhau chỗ nào"
          },
          {
            "slug": "jwt-cau-truc-va-cai-bay",
            "title": "JWT: cấu trúc và những cái bẫy"
          },
          {
            "slug": "access-token-va-refresh-token",
            "title": "Access token và refresh token"
          },
          {
            "slug": "spring-security-filter-chain",
            "title": "Filter chain của Spring Security"
          },
          {
            "slug": "luu-token-o-dau-cho-an-toan",
            "title": "Lưu token ở đâu cho an toàn"
          },
          {
            "slug": "bam-mat-khau-va-bcrypt",
            "title": "Băm mật khẩu: BCrypt và salt"
          }
        ]
      },
      {
        "topic": "Hiệu năng",
        "items": [
          {
            "slug": "do-truoc-khi-toi-uu",
            "title": "Đo trước khi tối ưu"
          },
          {
            "slug": "kiem-thu-tai-voi-k6",
            "title": "Kiểm thử tải với k6"
          },
          {
            "slug": "log-query-cham",
            "title": "Bật log query chậm và đọc nó"
          }
        ]
      }
    ]
  },
  {
    "level": "Middle",
    "goal": "Mục tiêu: chịu trách nhiệm cho một dịch vụ chạy production — thiết kế được, gỡ lỗi được lúc 2 giờ sáng, và giải thích được đánh đổi.",
    "groups": [
      {
        "topic": "Java core",
        "items": [
          {
            "slug": "thread-pool-dung-cho-dung",
            "title": "Thread pool: dùng cho đúng"
          },
          {
            "slug": "completablefuture-thuc-te",
            "title": "CompletableFuture trong thực tế"
          },
          {
            "slug": "java-memory-model",
            "title": "Java Memory Model và từ khoá volatile"
          },
          {
            "slug": "gc-chon-va-tinh-chinh",
            "title": "Chọn và tinh chỉnh GC"
          },
          {
            "slug": "virtual-thread-doi-gi",
            "title": "Virtual thread đổi được những gì"
          }
        ]
      },
      {
        "topic": "Database & SQL",
        "items": [
          {
            "slug": "replication-va-doc-tu-replica",
            "title": "Replication và đọc từ replica"
          },
          {
            "slug": "phan-vung-va-sharding",
            "title": "Phân vùng bảng và sharding"
          },
          {
            "slug": "outbox-pattern",
            "title": "Outbox pattern: ghi DB và bắn event cho nhất quán"
          },
          {
            "slug": "migration-khong-downtime",
            "title": "Migration schema không downtime"
          }
        ]
      },
      {
        "topic": "Kafka",
        "items": [
          {
            "slug": "kafka-rebalance-va-xu-ly-hai-lan",
            "title": "Consumer group, rebalance và message bị xử lý hai lần"
          },
          {
            "slug": "exactly-once-that-su-la-gi",
            "title": "Exactly-once thật sự nghĩa là gì"
          },
          {
            "slug": "retry-va-dead-letter-topic",
            "title": "Retry, backoff và dead letter topic"
          },
          {
            "slug": "schema-registry-va-tuong-thich",
            "title": "Schema registry và tương thích ngược"
          }
        ]
      },
      {
        "topic": "Redis",
        "items": [
          {
            "slug": "redis-cluster-va-phan-manh",
            "title": "Redis cluster và phân mảnh khoá"
          },
          {
            "slug": "rdb-hay-aof",
            "title": "Persistence: RDB hay AOF"
          },
          {
            "slug": "pubsub-va-redis-stream",
            "title": "Pub/Sub và Redis Stream"
          }
        ]
      },
      {
        "topic": "Docker & CI/CD",
        "items": [
          {
            "slug": "kubernetes-du-dung",
            "title": "Kubernetes đủ dùng cho backend"
          },
          {
            "slug": "blue-green-va-canary",
            "title": "Blue-green và canary deployment"
          },
          {
            "slug": "quan-ly-secret",
            "title": "Quản lý secret trong pipeline"
          }
        ]
      },
      {
        "topic": "Mạng máy tính",
        "items": [
          {
            "slug": "load-balancer-l4-va-l7",
            "title": "Load balancer L4 và L7"
          },
          {
            "slug": "timeout-retry-circuit-breaker",
            "title": "Timeout, retry và circuit breaker"
          },
          {
            "slug": "grpc-khi-nao-nen-dung",
            "title": "gRPC: khi nào nên dùng"
          }
        ]
      },
      {
        "topic": "Hiệu năng",
        "items": [
          {
            "slug": "p99-chu-khong-phai-trung-binh",
            "title": "Đo hiệu năng: p99 chứ không phải trung bình"
          },
          {
            "slug": "doc-flame-graph",
            "title": "Đọc flame graph với async-profiler"
          },
          {
            "slug": "tim-ro-ri-bo-nho",
            "title": "Tìm rò rỉ bộ nhớ bằng heap dump"
          },
          {
            "slug": "uoc-luong-cong-suat",
            "title": "Ước lượng công suất hệ thống"
          }
        ]
      },
      {
        "topic": "AI ứng dụng",
        "items": [
          {
            "slug": "rag-cho-nguoi-viet-java",
            "title": "RAG giải thích cho người viết Java"
          },
          {
            "slug": "spring-ai-goi-mo-hinh",
            "title": "Spring AI: gọi mô hình từ ứng dụng thật"
          }
        ]
      }
    ]
  }
];
